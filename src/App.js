/* eslint-disable */

import { useState } from 'react';
import './App.css';
import React from 'react';

function App() {
	// 자료 잠깐 저장할 땐 변수
	// let post = '강남 우동 맛집';

	// State + Destructuring
	// 왜? State를 사용하던 html은 자동 재렌더링됨
	// let [글제목1, set글제목1] = useState('여자 코트 추천');
	// let [글제목2, set글제목2] = useState('이대 우동 맛집');
	// let [글제목3, set글제목3] = useState('JavaScript 독학');
	let [글제목, set글제목] = useState(['여자 코트 추천', '강남 우동 맛집', '프론트엔드 독학']);
	let [따봉, set따봉] = useState([0, 0, 0]);
	let [날짜, set날짜] = useState(['2022.09.16', '2022.09.15', '2022.09.14']);
	let [modal, setModal] = useState(false);
	let [title, setTitle] = useState(0);
	let [입력값, set입력값] = useState('');

	function 좋아요(i) {
		let copy = [...따봉];
		copy[i] = 따봉[i] + 1;
		set따봉(copy);
	}

	function 남자코트로변경() {
		// DeepCopy해줘야 State비교과정에서 True가 뜨지 않기 때문에 변경이 진행됨
		let copy = [...글제목];
		copy[0] = '남자 코트 추천';
		set글제목(copy);
	}

	function 글제목정렬() {
		let copy = [...글제목];
		copy.sort();
		set글제목(copy);
	}

	function 새로운글추가() {
		// 응용1. 글에 아무것도 입력안하고 발행버튼 누르는 경우 막기
		if (입력값 === '') return;
		let copy = [입력값, ...글제목];
		set글제목(copy);
		// 응용2. 따봉기록공간 추가
		let copy2 = [0, ...따봉];
		set따봉(copy2);
		// 응용3. 날짜 추가
		let today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth() + 1;
		let day = today.getDate();
		let copy3 = [`${year}.${month}.${day}`, ...날짜];
		set날짜(copy3);
	}

	function 이글삭제(i) {
		let copy = [...글제목];
		copy = copy.filter((v, idx) => idx !== i);
		set글제목(copy);
		// 응용2. 따봉기록공간 삭제
		let copy2 = [...따봉];
		copy2 = copy2.filter((v, idx) => idx !== i);
		set따봉(copy2);
		// 응용3. 날짜 삭제
		let copy3 = [...날짜];
		copy3 = copy3.filter((v, idx) => idx !== i);
		set날짜(copy3);
	}

	return (
		<div className='App'>
			<div className='black-nav'>
				<h4>React Blog</h4>
			</div>
			{/* 데이터바인딩 */}
			{/* <h4 style={{ color: 'blue', fontSize: '1rem' }}>{post}</h4> */}
			{/* <div className='list'>
        <p>
          <button onClick={남자코트로변경}>제목 바꾸기</button>{' '}
          <button onClick={글제목정렬}>글제목 정렬</button>{' '}
        </p>
      </div> */}
			{/* <div className="list">
				<h4>
					{글제목[0]} <span onClick={좋아요}>🧡</span> {따봉}
				</h4>
				<p>2월 17일 발행</p>
			</div>
			<div className="list">
				<h4>{글제목[1]}</h4>
				<p>2월 17일 발행</p>
			</div>
			<div className="list">
				<h4 onClick={() => setModal(!modal)}>{글제목[2]}</h4>
				<p>2월 17일 발행</p>
			</div> */}
			{
				//
				글제목.map((v, i) => {
					return (
						<div className='list' key={i}>
							<h4
								onClick={() => {
									setModal(true);
									setTitle(i);
								}}
							>
								{v}{' '}
								<span
									onClick={e => {
										// 상위 html로 퍼지는 이벤트버블링 막기
										e.stopPropagation();
										좋아요(i);
									}}
								>
									🧡
								</span>{' '}
								{따봉[i]}{' '}
								<button
									onClick={e => {
										e.stopPropagation();
										이글삭제(i);
									}}
								>
									삭제
								</button>
							</h4>
							{/* 응용3. 날짜 데이터 추가 */}
							<p>{날짜[i]} 발행</p>
						</div>
					);
				})
			}
			<input
				onChange={e => {
					set입력값(e.target.value);
				}}
			/>{' '}
			<button onClick={새로운글추가}>추가</button>
			{
				//
				modal ? (
					<Modal 글제목={글제목} color='orange' 남자코트로변경={남자코트로변경} title={title} />
				) : null
			}
			<Modal2 />
		</div>
	);
}

// function List() {
// 	return (
// 		<div className="list">
// 			<h4>제목</h4>
// 			<p>2월 17일 발행</p>
// 		</div>
// 	);
// }

function Modal(props) {
	return (
		<div className='modal' style={{ background: props.color }}>
			<h4>{props.글제목[props.title]}</h4>
			<p>날짜</p>
			<p>상세내용</p>
			<button onClick={props.남자코트로변경}>글수정</button>
		</div>
	);
}

// Class Component
class Modal2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'choco',
			age: 20,
		};
	}
	render() {
		return (
			<div>
				안녕 {this.state.age}살의 {this.state.name}!{' '}
				<button
					onClick={() => {
						this.setState({ age: 25 });
					}}
				>
					20살 아닌디
				</button>
			</div>
		);
	}
}

export default App;
