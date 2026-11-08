* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background-color: #1e272e;
    color: #ffffff;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

#room-bar {
    width: 95vw;
    margin-top: 15px;
    padding: 12px 20px;
    background-color: #2c3e50;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
}

#room-id-input {
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    font-size: 14px;
}

button {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    background-color: #00d2d3;
    color: #1e272e;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
}

button:hover {
    background-color: #01a3a4;
}

#connection-status {
    margin-left: auto;
    font-size: 14px;
    color: #ff9ff3;
}

#game-container {
    width: 95vw;
    height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 15px 0;
}

#board-label, #deck-label {
    font-size: 14px;
    font-weight: bold;
    color: #c8d6e5;
    margin-bottom: -8px;
}

#board {
    flex: 2;
    background-color: #222f3e;
    border: 2px dashed #576574;
    border-radius: 12px;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 8px;
    overflow-y: auto;
}

#my-deck {
    flex: 1;
    background-color: #341f97;
    border-radius: 12px;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 8px;
    overflow-y: auto;
}

/* 타일 스타일링 */
.tile {
    width: 44px;
    height: 62px;
    background-color: #f5f6fa;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 800;
    cursor: grab;
    user-select: none;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.tile:active {
    cursor: grabbing;
    transform: scale(1.08);
}

.tile.dragging {
    opacity: 0.4;
}

/* 타일 색상 클래스 */
.color-black { color: #2f3640; }
.color-red   { color: #ee5253; }
.color-blue  { color: #2e86de; }
.color-yellow{ color: #f6b93b; }
.color-joker { color: #8395a7; }
