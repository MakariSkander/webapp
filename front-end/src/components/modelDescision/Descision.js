import React, { useState } from 'react'
import './style.css'
function Descision() {
	const[status,setStatus]=useState(true)
	
  return (
    <div>
		{ status ?(
        <div class="alert alert--success">
	<i class="fa fa-check-circle fa-2xl icon"></i> 
	<div class="content">
		<div class="title">Here is an info alert title</div>
		<div class="body">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima explicabo ratione ab unde officiis exercitationem illum nobis magni recusandae.
		</div>
	</div>
</div>) :
(
<div class="alert alert--error">
	<i class="fa fa-times-circle fa-2xl icon"></i> 
	<div class="content">
		<div class="title">Here is an info alert title</div>
		<div class="body">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima explicabo ratione ab unde officiis exercitationem illum nobis magni recusandae.
		</div>
	</div>
</div>)
}
</div>
  )
}

export default Descision