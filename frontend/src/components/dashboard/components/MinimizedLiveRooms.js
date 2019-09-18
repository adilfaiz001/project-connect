import React, { Component } from "react";
import "./style/MinimizedLiveRooms.css";

class MinimizedLiveRooms extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <div className='container liveroom-container'>
                    <div className='column'>
                        <div className='ui segment live-block'>
                            <div className='room-header'>
                                <h3 id='liveroom-header' style={{marginBottom:'5px'}}>Live Rooms</h3>
                                <i className="fas fa-angle-down" style={{cursor:'pointer'}} onClick={() => this.minimizeRoomList()}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MinimizedLiveRooms;