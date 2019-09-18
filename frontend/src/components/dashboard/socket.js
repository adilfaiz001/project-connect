const io = require('socket.io-client');

let username;
let roomname;

export default function () {
    // const socket = io.connect('https://api.virtualroom.thelattice.org');
    // const socket = io.connect('http://localhost:8080');
    const socket = io.connect('https://api.chats.thelattice.org');

    socket.on('log', function(array) {
        console.log.apply(console, array);
    });

    function create(params, cb) {
        
        username = params.username;
        roomname = params.roomname;

        // console.log(username, roomname);

        socket.emit('create_room', roomname, username);

        socket.once('created', () => {
            console.log('Room Created with roomname:'+roomname);
            cb();
            console.log('Socket After Room Callback');
        });

        socket.on('room-error', (message) => {
            console.log(message);
            cb(message);
        });
    }
    
    function join(params, callback) {

        username = params.username;
        roomname = params.roomname;

        socket.emit('join_room', username, roomname);

        socket.once('joined', (roomname, username) => {
            console.log(username + ' Joined: ' + roomname);

            callback(username, roomname);

        });
    }

    // function receiveJoin(cb) {
    //     socket.on('receiveJoin', function() {
    //         console.log("receiving remote join stream");
    //         cb(true);
    //     });
    // }

    // function checkforPeers(callback) {
    //     socket.on('join', function(roomname) {
    //         callback(roomname);
    //     });
    // }

    // socket.on('join', function (roomname, join_id){
    //     console.log('Another peer made a request to join room ' + roomname + "by the join_id " + join_id);

    //     receiver_id = join_id;

    //     isOfferInitiator = false;
    //     isStarted = false;
    //     isChannelReady = true;


    /**
     * =================================================================================================================================//
     * CHAT TEMPLATE
     * =================================================================================================================================//
     */

    function newJoinMessage(cb) {
        socket.on('newJoin', (username, roomname) => {
            cb(username, roomname);
        });
    }

    function onMessage(message, username, roomname) {
        // console.log(message, username, roomname);
        socket.emit('onMessage', message, username, roomname);
    }

    function receiveMessage(cb) {
        socket.on('receiveMessage', (message, username, roomname) => {
            cb(message, username, roomname);
        })
    }

    //===================================================================================================================================//
    function getLiveRooms(cb) {
        // console.log("Getting room list");

        setInterval(() => {
            socket.emit('roomlist');
            socket.on('roomlist', (roomlist) => {
                cb(roomlist);
            });

        }, 2000)

        // setTimeout(getLiveRooms, 2000)
    }
    
    function leaveRoom(username, roomname, cb) {
        // console.log(username, roomname);
        // console.log(cb);
        socket.emit('leave', username, roomname);
        socket.on('left', () => {
            cb();
            console.log("Successfully left");
        })
    }

    function leaveMessage(cb) {
        socket.on('user-leave', (username, roomname) => {
            cb(username, roomname);
        });
    }


    return {
        create,
        join,
        newJoinMessage,
        onMessage,
        receiveMessage,
        getLiveRooms,
        leaveRoom,
        leaveMessage
    }
}