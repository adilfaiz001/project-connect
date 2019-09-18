import React, { Component } from "react";
import "./style/MaximizedLiveRooms.css";

class MaximizedLiveRooms extends Component {
    constructor() {
        super();
    }

    onLiveRoomClick = (e) => {
        console.log(e);
        this.props.onJoin(e);
        //now set that roomname in livebox as green to show you are connected to it
    }

    minimizeRoomList = () => {
        
    }

    render () {
        let roomlist = this.props.roomlist;
        // console.log(roomlist);
        return (
            <div className='container'>
                <div className='ui raised segment'>
                    <div className='ui grid' style={{backgroundColor:'#386e38'}}>
                        <div className='fourteen wide column'>
                            <h3 id='liveroom-header'>Live Rooms</h3>
                        </div>
                        <div className='two wide column'>
                            <i className="fas fa-angle-down" style={{cursor:'pointer'}} onClick={() => this.minimizeRoomList()}></i>
                        </div>
                    </div>
                    <div className='ui grid live-rooms'>
                            {
                                roomlist.map((room, index) => {
                                    return <div className='row room' key={index} style={{cursor:'pointer',marginBottom:'0'}} onClick={() => this.onLiveRoomClick(room.chatroomName)}>
                                        <div className='two wide column'>
                                            <i className="fas fa-user-friends fa-sm room-icon"></i>
                                        </div>
                                        <div className='twelve wide column'> 
                                            <p>{room.chatroomName}</p>
                                        </div>
                                        <div className='two wide column'>
                                            <p>{room.activeMembers.length}</p>
                                        </div>
                                    </div>
                                })
                            }
                    </div>
                </div>
            </div>
        )
    }
}

export default MaximizedLiveRooms;