import React from 'react';
import'./css/amis.css';
import {Link} from 'react-router-dom';
import prf from '../pht/saf.jpg';
import MonImage from '../pht/logo.png';

import Emoji from 'react-emoji-render';
import './css/header.css';
function Amis() {
    return(
<div>

<nav>

      <div className="logo">
  <h1>Socié <span>Net</span></h1>
  <img src={MonImage} alt="ui" width="30PX" />
  </div>

<ul>

    <li>

    <Link to='/reseau/page/Acc'className="item"  style={{ '--hue': '200deg' }}>
        
    <span className="icon mono" id="blur0" aria-hidden="true">
            <Emoji text=":house:" />
          </span>
          <span className="icon mono" aria-hidden="true">
            <Emoji text=":house:" />
          </span>
          <span
            className="icon midl"
            aria-hidden="true"
            style={{ backgroundImage: '-moz-element(#blur0)' }}
          >
            <Emoji text=":house:" />
          </span>
          <span className="icon grey" aria-hidden="true">
            <Emoji text=":house:" />
          </span>
        </Link>
     
    </li>
    <li>
    <Link to='/reseau/page/Propos'className="item"  style={{ '--hue': '200deg' }}>
    <span className="icon mono" id="blur1" aria-hidden="true">
            <Emoji text=":information_source:" />
          </span>
          <span className="icon mono" aria-hidden="true">
            <Emoji text=":information_source:" />
          </span>
          <span
            className="icon midl"
            aria-hidden="true"
            style={{ backgroundImage: '-moz-element(#blur1)' }}
          >
            <Emoji text=":information_source:" />
          </span>
          <span className="icon grey" aria-hidden="true">
            <Emoji text=":information_source:" />
          </span>
  </Link>
     </li>

    <li>

    <Link to='/reseau/page/Notif' className="item"  style={{ '--hue': '200deg' }}>
    <span className="icon mono" id="blur2" aria-hidden="true">
            <Emoji text=":bell:" />
          </span>
          <span className="icon mono" aria-hidden="true">
            <Emoji text=":bell:" />
          </span>
          <span
            className="icon midl"
            aria-hidden="true"
            style={{ backgroundImage: '-moz-element(#blur2)' }}
          >
            <Emoji text=":bell:" />
          </span>
          <span className="icon grey" aria-hidden="true">
            <Emoji text=":bell:" />
          </span>
    </Link>

</li>

<li>
<Link to='/reseau/page/amis' className="item"  style={{ '--hue': '200deg' }}>
<span className="icon mono" id="blur3" aria-hidden="true">
            <Emoji text=":bust_in_silhouette:" />
          </span>
          <span className="icon mono" aria-hidden="true">
            <Emoji text=":bust_in_silhouette:" />
          </span>
          <span
            className="icon midl"
            aria-hidden="true"
            style={{ backgroundImage: '-moz-element(#blur3)' }}
          >
            <Emoji text=":bust_in_silhouette:" />
          </span>
          <span className="icon grey" aria-hidden="true">
            <Emoji text=":bust_in_silhouette:" />
          </span>
          </Link>
</li>

     <li>
    <Link to='/reseau/page/Amis'className="item"  style={{ '--hue': '200deg' }}>
    <span className="icon mono" id="blur1" aria-hidden="true">
            <Emoji text=":electric_plug:" />
          </span>
          <span className="icon mono" aria-hidden="true">
            <Emoji text=":electric_plug:" />
          </span>
          <span
            className="icon midl"
            aria-hidden="true"
            style={{ backgroundImage: '-moz-element(#blur1)' }}
          >
            <Emoji text=":electric_plug:" />
          </span>
          <span className="icon grey" aria-hidden="true">
            <Emoji text=":electric_plug:" />
          </span>
  </Link>
     </li>

</ul>

<div className="id">

<img src={prf} alt="b" width="55PX" height="55PX" />
<div className="boule"></div>
<p>safia massaid</p>
</div>

</nav>



<div className="wrapper">
  <div className="contain">
    <h5>amis</h5>
  </div>


</div>
<div className="amis">
<div className="prs">

<img src={prf} alt=''  />
<p   className='user'>massaid safia </p>
<Link to="./" className='bouton' >scruter</Link>
</div>
</div>


</div>
    );
}
export default Amis;