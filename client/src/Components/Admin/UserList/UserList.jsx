import React from 'react';
export default class UserList extends React.Component{
    render(){
        return(
            <div className="u-list">
                <div class="ui fluid action input" id="search">
                <input type="text" placeholder="Search..."/>
                <div class="ui button">Search</div>
                </div>
            </div>
        )
    }
}