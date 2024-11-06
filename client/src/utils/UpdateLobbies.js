function fetchLobbies(socket, isConnected, dispatch, setOpenLobbies) {
    if (socket) {
        const handleMessage = (event) => {
            const message = JSON.parse(event.data);

            // Check for the 'UPDATE_LOBBIES' message type
            if (message.action === 'UPDATE_LOBBIES') {
                dispatch(setOpenLobbies(message.payload));
                console.log('Lobbies updated:', message.payload);
            }
        };

        // Set up the message handler when the socket is available
        socket.onmessage = handleMessage;

        if (isConnected) {
            // Send a message indicating that the client is requesting lobby updates
            const fetchLobbiesMessage = JSON.stringify({ type: 'LOBBY', action: 'FETCH_LOBBIES' });
            socket.send(fetchLobbiesMessage);
        }
    } else {
        console.error('WebSocket is not initialized.');
    }
}

export default fetchLobbies;
