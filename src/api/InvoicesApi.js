import Config from '../config'

async function getInvoiceList(){
    const response = await fetch(`${Config.baseURL}/invoices`);
    return response.json();
}
export {getInvoiceList}



async function getInvoice(id){
  const response = await fetch(`${Config.baseURL}/invoices/${id}`);
  return response.json();
}
export {getInvoice}


async function createInvoice(invoiceData){
    const response = await fetch(`${Config.baseURL}/invoices`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(invoiceData)
    })
    return response.json()
}
export {createInvoice}



async function updateInvoice(selectedInvoiceId, InvoiceCard){
    return fetch(`${Config.baseURL}/invoices/${selectedInvoiceId}`,{
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