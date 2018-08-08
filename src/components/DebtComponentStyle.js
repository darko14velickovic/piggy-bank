
export default {
  textBox: {
    display: 'block',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(148, 148, 148, 1)',
    padding: '2px 10px 3px 10px',
    lineHeight: '23px',
    fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif',
    fontSize: '15px',
    fontWeight: '100',
    color: '#000000',
    marginBottom: '18px',
    background: 'rgba(255, 255, 255, .35)',

    ':hover': {
      borderColor: 'rgba(100, 100, 100, 1)',
      background: 'rgba(255, 255, 255, .5)'
    },

    ':focus': {
      outline: 'none',
      borderColor: 'rgba(0, 120, 215, 1)',
      background: 'rgba(255, 255, 255, 1)'
    }
  },

  listHolder: {
    marginTop: '0px',
    paddingLeft: '15px',
    listStyleType:'none',
    fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif',
    fontSize: '15px',
    fontWeight: '100',
    color: '#000000',
    maxHeight: '300px',
    height: '300px',
    overflowY: 'scroll',
    border: '2px solid gray',
    width: '100%'
  },
  hrStyle: {
    border: '0',
    height: '1px',
    width: '100%',
    background: 'gray'

  },
  listItemStyle:{
    display: 'inline-block',
    marginTop: '5px'
  },
  removeIconStyle:{
    fontSize: '15px',
    marginLeft: '10px',
    width: '25px',
    height: '25px',
    color: 'red'
  },
  editIconStyle:{
    fontSize: '15px',
    marginLeft: '20px',
    width: '25px',
    height: '25px',
    color: 'black'
  }

};
