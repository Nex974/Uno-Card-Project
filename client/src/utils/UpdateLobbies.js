function fetchLobbies(socket, isConnected, dispatch, setOpenLobbies) {
    if (socket) {
        const handleMessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'UPDATE_LOBBIES') {
                dispatch(setOpenLobbies(message.payload));
                console.log('Lobbies updated:', message.payload);
            }
        };

        socket.onmessage = handleMessage;

        if (isConnected) {
            const fetchLobbiesMessage = JSON.stringify({ type: 'FETCH_LOBBIES' });
            socket.send(fetchLobbiesMessage);
        }
    } else {
        console.error('WebSocket is not initialized.');
    }
}

export default fetchLobbies;
