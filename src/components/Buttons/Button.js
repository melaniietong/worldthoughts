import React from 'react';

import '../../styles/_import';

/* ======== PROPS ====================================
    - text      String
    - event     Function
    - isBasic   Boolean [true (basic), false (accent)]
    - isSmall   Boolean [true (small), false (large)]
=================================================== */

export default function Button({ text, event, isBasic, isSmall }) {
  let classes = 'button pt-15 pb-15 pl-25 pr-25 border-r-10';

  if (isBasic) { classes += ' bg-white text-black'; } else { classes += ' bg-blue-300 text-white'; }
  if (isSmall) { classes += ' button-small'; } else { classes += ' button-large'; }

  return (
    <button onClick={event} className={classes}>{text}</button>
  );
}
