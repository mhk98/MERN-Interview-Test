/* eslint-disable no-undef */
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleDrawingQuery } from "../features/Drawing/Drawing";

const DrawingDetail = () => {
  const { id } = useParams();
  const canvasRef = useRef(null);

  // Fetch drawing data
  const { data, isLoading, isError, error } = useGetSingleDrawingQuery(id);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
  
      // Clear canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Ensure data.elements is defined and is an array
      if (Array.isArray(data.data.elements)) {
        data.data.elements.forEach(element => {
          if (element.type === 'line' && element.data?.startPoint && element.data?.endPoint) {
            // Safely destructure startPoint and endPoint
            const { startPoint, endPoint, color = 'black', thickness = 1 } = element.data;
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.strokeStyle = color;
            ctx.lineWidth = thickness;
            ctx.stroke();
          } else if (element.type === 'rectangle' && element.data?.topLeft && element.data?.bottomRight) {
            // Safely destructure rectangle data
            const { topLeft, bottomRight, color = 'black', borderWidth = 1 } = element.data;
            const width = bottomRight.x - topLeft.x;
            const height = bottomRight.y - topLeft.y;
            ctx.fillStyle = color;
            ctx.lineWidth = borderWidth;
            ctx.strokeRect(topLeft.x, topLeft.y, width, height);
            ctx.fillRect(topLeft.x, topLeft.y, width, height);
          } else if (element.type === 'circle' && element.data?.center) {
            // Safely destructure circle data
            const { center, radius = 10, color = 'black', borderWidth = 1 } = element.data;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = color;
            ctx.lineWidth = borderWidth;
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();
          } else if (element.type === 'text' && element.data?.position && element.data?.text) {
            // Safely destructure text data
            const { position, text, fontSize = 16, fontFamily = 'Arial', color = 'black' } = element.data;
            ctx.font = `${fontSize}px ${fontFamily}`;  // Ensuring font size and family are set
            ctx.fillStyle = color;                      // Set font color
            ctx.fillText(text, position.x, position.y);
          }
          
          
        });
      }
    }
  }, [data, isLoading, isError]);
  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error("Error fetching drawing data", error);
    return <p>Error loading drawing data.</p>;
  }

  return (
    <div>
      <h1 style={{textAlign:"center"}}>{data?.data?.title || 'No Title'}</h1>

      <div style={{display:"flex", justifyContent:"center"}} >
      <canvas ref={canvasRef} width={400} height={300} style={{ border: '1px solid black' }}></canvas>
    </div>
    </div>
  );
};

export default DrawingDetail;
