async function getInvoiceList(){
    const response = await fetch('http://localhost:3000/invoices');
    return response.json();
    }
    
    export {getInvoiceList}




async function saveInvoice(InvoiceCard){
    fetch("http://localhost:3000/invoices",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(InvoiceCard)
    })
}

export {saveInvoice}



async function updateInvoice(selectedInvoiceId, InvoiceCard){
    return fetch(`http://localhost:3000/invoices/${selectedInvoiceId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(InvoiceCard)
    })
  }
  
  export {updateInvoice}


  async function deleteInvoice(selectedInvoiceId){
    return fetch(`http://localhost:3000/invoices/${selectedInvoiceId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => data);
  }
  
  export {deleteInvoice}