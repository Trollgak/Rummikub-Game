// Firebase SDK 모듈 임포트
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, child } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG2zKJuUQlxLx4IHfFgl4xUydCRfH98bs",
  authDomain: "rummikub-game-deda5.firebaseapp.com",
  databaseURL: "https://rummikub-game-deda5-default-rtdb.firebaseio.com",
  projectId: "rummikub-game-deda5",
  storageBucket: "rummikub-game-deda5.firebasestorage.app",
  messagingSenderId: "35474698765",
  appId: "1:35474698765:web:17cc89a9c52d0b1d8b5b44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 상태 변수
let currentRoomId = "room1";
let draggedTileId = null;

// DOM 요소
const board = document.getElementById("board");
const myDeck = document.getElementById("my-deck");
const roomIdInput = document.getElementById("room-id-input");
const joinBtn = document.getElementById("join-room-btn");
const resetBtn = document.getElementById("reset-game-btn");
const statusText = document.getElementById("connection-status");

// 106개 루미큐브 전체 타일 셋 생성 함수
function createFullTileDeck() {
    const colors = ['black', 'red', 'blue', 'yellow'];
    const tiles = [];
    let idCounter = 1;

    // 색상별 1~13 각 2장씩
    colors.forEach(color => {
        for (let copy = 0; copy < 2; copy++) {
            for (let num = 1; num <= 13; num++) {
                tiles.push({ id: `tile_${idCounter++}`, number: num, color: color, zone: 'deck' });
            }
        }
    });

    // 조커 2장
    tiles.push({ id: `tile_${idCounter++}`, number: '☺', color: 'joker', zone: 'deck' });
    tiles.push({ id: `tile_${idCounter++}`, number: '☺', color: 'joker', zone: 'deck' });

    return tiles;
}

// 방 접속 및 수신 데이터 리스너 등록
function joinRoom(roomId) {
    currentRoomId = roomId;
    const roomRef = ref(db, `rooms/${roomId}`);

    statusText.textContent = `접속 중: ${roomId}`;

    // 실시간 데이터 변경 감지 (onValue)
    onValue(roomRef, (snapshot) => {
        const data = snapshot.val();
        if (!data || !data.tiles) {
            // 방이 없거나 타일 데이터가 없으면 새 판 생성
            initializeRoomData(roomId);
            return;
        }

        renderTiles(data.tiles);
        statusText.textContent = `방 [${roomId}] 실시간 동기화 됨`;
    });
}

// 방 초기 데이터 생성
async function initializeRoomData(roomId) {
    const initialTiles = createFullTileDeck();
    // 무작위 셔플
    initialTiles.sort(() => Math.random() - 0.5);

    // 처음에 14장은 내 덱에, 나머지는 보드(또는 남은 패 덱)에 세팅
    initialTiles.forEach((tile, idx) => {
        if (idx < 14) {
            tile.zone = 'deck';
        } else {
            tile.zone = 'board';
        }
    });

    await set(ref(db, `rooms/${roomId}/tiles`), initialTiles);
}

// 타일 화면 렌더링
function renderTiles(tiles) {
    board.innerHTML = '';
    myDeck.innerHTML = '';

    tiles.forEach(tileData => {
        const tileEl = document.createElement('div');
        tileEl.classList.add('tile', `color-${tileData.color}`);
        tileEl.textContent = tileData.number;
        tileEl.dataset.id = tileData.id;
        tileEl.draggable = true;

        // 드래그 시작 이벤트
        tileEl.addEventListener('dragstart', (e) => {
            draggedTileId = tileData.id;
            tileEl.classList.add('dragging');
            e.dataTransfer.setData('text/plain', tileData.id);
        });

        // 드래그 종료 이벤트
        tileEl.addEventListener('dragend', () => {
            tileEl.classList.remove('dragging');
            draggedTileId = null;
        });

        if (tileData.zone === 'board') {
            board.appendChild(tileEl);
        } else {
            myDeck.appendChild(tileEl);
        }
    });
}

// 드롭 존 이벤트 세팅 (보드 및 덱 영역)
const dropzones = document.querySelectorAll('.dropzone');
dropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault(); // 드롭 허용
    });

    zone.addEventListener('drop', async (e) => {
        e.preventDefault();
        const targetZone = zone.dataset.zone; // 'board' 또는 'deck'
        if (!draggedTileId) return;

        // DB에서 현재 타일 상태를 가져와 이동 위치 update
        const tilesRef = ref(db, `rooms/${currentRoomId}/tiles`);
        const snapshot = await get(tilesRef);
        if (snapshot.exists()) {
            const tiles = snapshot.val();
            const updatedTiles = tiles.map(t => {
                if (t.id === draggedTileId) {
                    return { ...t, zone: targetZone };
                }
                return t;
            });
            // 변경 사항을 Firebase DB로 전송 (모든 접속자에게 일괄 반영됨)
            await set(tilesRef, updatedTiles);
        }
    });
});

// 이벤트 리스너 등록
joinBtn.addEventListener('click', () => {
    const inputVal = roomIdInput.value.trim();
    if (inputVal) joinRoom(inputVal);
});

resetBtn.addEventListener('click', () => {
    if (confirm("현재 방의 모든 패를 초기화하시겠습니까?")) {
        initializeRoomData(currentRoomId);
    }
});

// 기본 실행: 초기 방(room1) 접속
joinRoom(currentRoomId);
