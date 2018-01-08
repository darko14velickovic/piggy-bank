import React, { Component } from 'react';

class HomeIcon extends React.Component{


  constructor(props) {
    super(props);

  }

 render() {
   return (
    <svg className="umbrella" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" aria-labelledby="title">
  <title id="title">Umbrella Icon</title>
        <path d="M32 19l-6-6v-9h-4v5l-6-6-16 16v1h4v10h10v-6h4v6h10v-10h4z"></path>
      </svg>
    );
 }
}

export default HomeIcon;
