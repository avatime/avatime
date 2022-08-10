// import React, { FC } from "react";
// import { ReactSketchCanvas } from "react-sketch-canvas";

// const styles = {
//   border: "0.0625rem solid #9c9c9c",
//   borderRadius: "0.25rem",
// };

// export const Canvas = class extends React.Component {
//   constructor(props) {
//     super(props);

//     this.canvas = React.createRef();
//   }

//   render() {
//     return (
//       <div>
//         <ReactSketchCanvas
//           ref={this.canvas}
//           strokeWidth={5}
//           strokeColor="black"
//           width="500px"
//           height="500px"
//         />
//         <button
//           onClick={() => {
//             this.canvas.current
//               .exportImage("png")
//               .then((data) => {
//                 console.log(data);
//                 console.log(this.canvas);
//               })
//               .catch((e) => {
//                 console.log(e);
//               });
//           }}
//         >
//           Get Image
//         </button>
//       </div>
//     );
//   }
// };

import React, { FC } from 'react'

interface IProps {}

/**
* @author
* @function @Canvas
**/

export const Canvas:FC<IProps> = (props) => {
  return (
    <div>Canvas</div>
   )
 }
