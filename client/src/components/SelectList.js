import React, {useState} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function ToolBar() {
    const [select, setSelect] = useState(false);
    const [unSelect, setUnselect] = useState(false);
    const [reset, setReset] = useState(false);

    const selectAll = () => {
        setSelect(true);
        setUnselect(false);
        setReset(false)
    }

    const unselectAll = () => {
        setUnselect(true);
        setSelect(false);
        setReset(false)
    }

    const resetClick = () => {
      setUnselect(false);
      setSelect(false);
      setReset(true)
  }


  return (
    <ListGroup>
        <ListGroup.Item 
        onClick={selectAll}
        active = {select}
        style={{cursor: 'pointer'}}
        key="1"
        >Select all</ListGroup.Item>
        <ListGroup.Item
         style={{cursor: 'pointer'}}
         onClick={unselectAll}
         active = {unSelect}
         key="2"
        >Unselect all</ListGroup.Item>
        <ListGroup.Item
         onClick={resetClick}
         active = {reset}
         style={{cursor: 'pointer'}}
         key="2"
        >Reset</ListGroup.Item>
    </ListGroup>
  )
}

export default ToolBar