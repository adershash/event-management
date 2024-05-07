import React from 'react'
import './certificate.css'
import { useLocation } from 'react-router-dom'
import generatePDF, { Resolution, Margin } from 'react-to-pdf';



const options: Options = {
  filename: "certificate.pdf",
  method: "save",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.EXTREME,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.SMALL,
    // default is 'A4'
    format: "letter",
    // default is 'portrait'
    orientation: "landscape"
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/jpeg",
    qualityRatio: 1
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true
    }
  }
};

// you can also use a function to return the target element besides using React refs
const getTargetElement = () => document.getElementById("container");

const downloadPdf = () => generatePDF(getTargetElement, options);

function Certificate() {
  const {state}=useLocation() 
  return (
    <div >
    <div className='certificat-section' >
         <div class="border-pattern" id='container'>
      <div class="content">
          <div class="inner-content">
              <h1 className='Cheading1'>Certificate</h1>
              <h2 className='Cheading2'>of Excellence</h2>
              <h3 className='Cheading3'>This Certificate Is Proudly Presented To</h3>
              <p className='Cpara'>{state.Cdata.userName}</p>
              <h3 className='Cheading3'>Has Completed</h3>
              <p className='Cpara'>{state.Cdata.eventName}</p>
              <h3 className='Cheading3'>On</h3>
              <p className='Cpara'>{state.Cdata.eventDate}</p>
              <div className='verify-section'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
</svg>
    

              </div>
          </div>
      </div>
  </div>
      
    </div>

    <button className='cdownload' onClick={()=>{downloadPdf()}}>Download</button>
    </div>
  )
}

export default Certificate
