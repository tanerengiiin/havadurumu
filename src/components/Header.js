import React, { useContext, useState } from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Modal from 'react-modal';
import AutoComplete from './AutoComplete';
import MainContext from '../MainContext';
import Error from './Error';
import { MdPlace } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { motion } from "framer-motion";
import Search from './Search';

Modal.setAppElement("body");
const Header = () => {
  
  
  const {setFocusSearch,focusSearch,toggleSwitch, isSwitchOn,setIsSwitchOn,setCityName, cityName, toggleModal, modalIsOpen, setModalIsOpen, error } = useContext(MainContext);


  return (
    <div className='header'>
      <div className='header-con'>
        <MdPlace className='h-icon' />
        <h2>{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</h2>
        <FiSearch onClick={toggleModal} className='h-icon' />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          className="search-modal"
          overlayClassName="search-modal-overlay"
        >
          <Search/>

          {/* {searchingCities.map(city=>(
            <AutoComplete key={city.Key} city={city} setCityName={setCityName} toggleModal={toggleModal}/>
          ))} */}
          {error && <Error />}
        </Modal>
      </div>
      <div className='header-switch'>
        <div className='switch-txt'>Günlük</div>
        <div className="switch" data-ison={isSwitchOn} onClick={toggleSwitch}>
          <motion.div className="handle" layout transition={spring} />
        </div>
        <div className='switch-txt'>Saatlik</div>
      </div>
    </div>
  )
}

export default Header

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};