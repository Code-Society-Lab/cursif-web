import React from 'react';
import Link from 'next/link'

export function Button({ children, className, onClick }) {
  return (
    <button className={`button ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

export function LinkButton({ children, className, link }) {
  return (
    <Link className={`button ${className || ''}`} href={link}>
      {children}
    </Link>
  );
}