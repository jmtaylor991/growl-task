import React, { useState, useEffect } from 'react';

import './growl.css'

export const Growl = ({ active, message, onDismissed }) => (
  <div className={`growl${active ? " active" : ""}`}>
    {message}
    <div onClick={onDismissed} className="growl-close" />
  </div>
)

export function useGrowl( timeout = 3000 ) {
    // state of the growl
    const [growlActive, setGrowlActive] = React.useState(false);

    // set timeout to automatically dismiss the growl
    // Option added: (timeout = 3000) as default
    // use Effect then clear timeout for growl
    useEffect(() => {
      let timeoutId;
      if (growlActive) {
          timeoutId = setTimeout(() => setGrowlActive(false), timeout);
      }
      return () => clearTimeout(timeoutId);
    }, [growlActive, timeout]);

    return [
        // the first arg is the state
        growlActive, 

        // the second arg is a fn that allows you to safely set its state
        (active) => {
            setGrowlActive(active)
        },
    ]
}