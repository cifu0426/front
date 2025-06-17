/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';

export type LogoProps = object

const Logo: React.FC<LogoProps>  = ({}) => {
	return (
		<div className="w-1/2 bg-sky-200 flex flex-col items-center justify-center">
 			{/* Contenedor centrado vertical y horizontalmente */}
      		<div className="w-72 h-72 mb-8">
				<img src="/logo.png"
          			 alt="Pet Manager Logo"
           			 width={400} // ancho original de la imagen
          			 height={400} // alto original de la imagen
          			 className="w-full h-full object-contain" // ocupa todo el contenedor sin deformar
				/>
			</div>
			<div className="Titulo">
				<h1 className="text-4xl font-bold text-blue-900">PET MANAGER</h1> {/* Título */}
			</div>
		</div>
	);
};

export default Logo;