import React, { Component } from 'react';

class DollarIcon extends React.Component{


  constructor(props) {
    super(props);

  }

 render() {
   return (
    <svg className="umbrella" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" aria-labelledby="title">
  <title id="title">Umbrella Icon</title>
        <path d="M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM15 29c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12zM16 16v-4h4v-2h-4v-2h-2v2h-4v8h4v4h-4v2h4v2h2v-2h4l-0-8h-4zM14 16h-2v-4h2v4zM18 22h-2v-4h2v4z"></path>
      </svg>
    );
 }
}

export default DollarIcon;
