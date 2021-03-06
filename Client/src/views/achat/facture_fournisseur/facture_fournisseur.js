import React from 'react'
import html2pdf from 'react'
import jsPDF from 'jspdf'
import {
  CBadge,
  CButton,
  CCard,
  CCardHeader,
  CCol,
  CDataTable,
  CCardBody,
  CCardFooter,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CImg,
  CSwitch,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from '../../../reusable'

import axios from "axios"
import  { useState, useEffect } from 'react';

const fields = ['fournisseur','email','date', 'montant'];










const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)


const [listfour,setlistfour]=useState({
  fournisseur:[]
})
const [listfactures,setlistfactures]=useState({
  factures:[]
})


const affichefactures=()=>{
  axios.get("http://localhost:3001/factureF")
  .then(response =>{
    let listname=[];
    console.log(response.data)

    for (let index = 0; index < response.data.length; index++) {
        listname = listname.concat( [
          {
 //           fournisseur:response.data[index].fournisseur,
 //           date:response.data[index].date,
//            montant:response.dada[index].montant
           fournisseur:response.data[index].fournisseur.nom,
           email:response.data[index].fournisseur.email,

           date:response.data[index].date,
           montant:response.data[index].montant


          }
        ]);
        
    }


    setlistfactures({
      factures:listname
    })

  })
  .catch((err)=>{
    alert("Hello! I am an alert box!");
    //setDanger(!danger)
  })
}

const update=()=>{
    axios.get("http://localhost:3001/fournisseur")
    .then(response =>{

      let listname=[];
      for (let index = 0; index < response.data.length; index++) {
          listname = listname.concat( [response.data[index].nom]);
          
      }
      setlistfour({
        fournisseur:listname
      })

    })
    .catch((err)=>{
      alert("error in update function");
 
    })
}

const [listprod,setlistprod]=useState({
  produit:[]
})

const [id,setid]=useState(1)


const updatelistproduit=()=>{
    axios.get("http://localhost:3001/produit")
    .then(response =>{

      let listname=[];
      for (let index = 0; index < response.data.length; index++) {
          listname = listname.concat( [response.data[index].label]);
          
      }
      setlistprod({
        produit:listname
      })

    })
    .catch((err)=>{
      alert("error in updateproduit function");
 
    })
}

const show_prod=(id)=>{

 
  
  updatelistproduit();

  var s=document.getElementById(id);
  s.innerHTML="";

  /*
  var option="";
  for (let index = 0; index < list.length; index++) {
    option=option+"<option value=\""+list[index]+"\">"+list[index]+"</option>"
    
  }
  */
  
  for (let index = listprod.produit.length-1; index >=0 ; index--) {
    var newoption=document.createElement("option");
    newoption.value=listprod.produit[index];
    newoption.innerHTML=listprod.produit[index];
    s.options.add(newoption);
  }
  

};

const show_four=()=>{
  //const button1=document.getElementById("show_four");
  //button1.addEventListener('click',function(e){
  //e.preventDefault();
  //})
  update();
  update();

  var s=document.getElementById("fournisseur");
  s.innerHTML="";
  /*
  var option="";
  for (let index = 0; index < list.length; index++) {
    option=option+"<option value=\""+list[index]+"\">"+list[index]+"</option>"
    
  }
  */
  
  for (let index = listfour.fournisseur.length-1; index >=0 ; index--) {
    var newoption=document.createElement("option");
    newoption.value=listfour.fournisseur[index];
    newoption.innerHTML=listfour.fournisseur[index];
    s.options.add(newoption);
  }
  
console.log(id);
};

const [listid,setListid]=useState({
  id:[]
})



const getidfour=()=>{
  var list2=recuperer_fournisseurs();
  var list=[];

  axios.post("http://localhost:3001/fournisseur/nom",{
    nom:list2
  }).then(response =>{

    var var2=response.data;
    //console.log(var2)



    for (let index = 0; index < var2.length; index++) {
      list=list.concat([var2[index]._id])   ; 
    };
    setListid({id:list});
   
    
  }).catch((err)=>{
    setListid({id:[]});


  })

  console.log(listid);


}

function recuperer_fournisseurs()
{
	let total = [];
	var ChoixCd = document.getElementById("fournisseur");
	for(let i=0;i<ChoixCd.options.length;i++)
	{ 
		if (ChoixCd.options[i].selected)
		{ 
			total = total.concat([ChoixCd.options[i].value]) ;
		}
  }
 
  
	return total;
}
function recuperer_produit(id2)
{
	let total = [];
	var ChoixCd = document.getElementById(id2);
	for(let i=0;i<ChoixCd.options.length;i++)
	{ 
		if (ChoixCd.options[i].selected)
		{ 
			total = total.concat([ChoixCd.options[i].value]) ;
		}
  }
 
  
	return total;
}

const calculertotal=()=>{
  var tot=0;
  for (let index = 1; index <= id; index++) {
    if( document.getElementById(index+"4").value != NaN){
      tot+= Number(document.getElementById(index+"4").value);
    }
    
  }
  return tot


}

const enregistrer=()=>{
  axios.post("http://localhost:3001/api/v1/products",{
name:document.getElementById("fournisseur").value,
image:document.getElementById("date-input").value,
countInStock:calculertotal()
  })

}



  const generatePDF = () => {
    var doc = new jsPDF('p', 'pt');
    var four=document.getElementById('fournisseur')
    var date=document.getElementById('date')



    doc.setTextColor(160, 160, 168);
    doc.text(300,100,'FACTURE FOURNISSEUR');
    doc.setTextColor(61, 61, 61);
    doc.setFontSize(13)
    doc.setLineWidth(3); 


    doc.line(60, 130, 500, 130);

    doc.text(80, 150, "fournisseur                       "+four.value)
    doc.text(80, 180, "Numero mobile            98547254 ")
    doc.text(80, 210, "Adresse                         adresse1")
    doc.text(80, 240, "date de document            "+date.value)
   
    doc.line(60, 310, 500, 310);

   
    doc.text(80, 330, "Designetion")
    doc.text(180, 330, "Quantit?? ")
    doc.text(280, 330, "Prix HT  ")
    doc.text(380, 330, "Total HT")

doc.setFontSize(10)
var marginleft=80;
var margintop=350
var array=[]
var list=[]
var id_sec=""
for (let index1 = 1; index1 <= id; index1++) {
    
    for (let index0 = 1; index0 < 5; index0++) {
        id_sec=index1+""+index0;
        doc.text(marginleft, margintop, document.getElementById(id_sec).value);
    
        marginleft+=100;
    }
    margintop+=30
    marginleft-=400
}

doc.line(60, margintop, 500, margintop);


doc.setFontSize(13)
var tot_HT=0
var prix_timbre=0.6
var netapayer=0
for (let index2 = 1; index2 <= id; index2++) {

tot_HT+=  parseInt( document.getElementById(index2+"4").value,10);

}
netapayer=tot_HT+prix_timbre

marginleft+=300
margintop+=30
doc.text(marginleft, margintop, "Totat_HT");
doc.text(marginleft+80, margintop, tot_HT+"");
margintop+=30
doc.text(marginleft, margintop, "Timbre fiscal");
doc.text(marginleft+80, margintop, prix_timbre+"");
margintop+=30
doc.text(marginleft, margintop, "Net ?? payer");
doc.text(marginleft+80, margintop, netapayer+"");

doc.save('demo.pdf')
}   



  const ajouter_ligne  = () => {
    if(id<6){
        
        
        var x = document.getElementById(id+1);
    
        x.style.display = "inline-block";
        setid(id+1);
        console.log(id)
    }
  }
  const supprimer_ligne  = () => {
    if(id>1){
        var x = document.getElementById(id);
    
        x.style.display = "none";
        setid(id-1);
        console.log(id)

    }
  }
 
const settotalhtonchangequantit??= (val)=>{

  var var1=document.getElementById(val).value;
  var var2=document.getElementById(val[0]+"3").value;

  if( var1 != "" & var2 != "") {
    document.getElementById(val[0]+"4").value= var1*var2
  }else{
    document.getElementById(val[0]+"4").value=NaN
  }
}
const settotalhtonchangeprixht= (val)=>{

  var var1=document.getElementById(val).value;
  var var2=document.getElementById(val[0]+"2").value;

  if( var1 != "" & var2 != "") {
    document.getElementById(val[0]+"4").value= var1*var2
  }else{
    document.getElementById(val[0]+"4").value= NaN
  }
}


  const [modal, setModal] = useState(true)
  const [large, setLarge] = useState(false)
  const [small, setSmall] = useState(false)
  const [primary, setPrimary] = useState(false)
  const [success, setSuccess] = useState(false)
  const [warning, setWarning] = useState(false)
  const [danger, setDanger] = useState(false)
  const [info, setInfo] = useState(false)


  const reset=()=>{
    document.getElementById("fournisseur").value="";
    document.getElementById("date").value="";
    document.getElementById("remarque").value="";

  }
  const valider=()=>{
    var fournisseur=document.getElementById("fournisseur").value;
    var date=document.getElementById("date").value;
    var listfourselectionn??=recuperer_fournisseurs();
  
    
    if(fournisseur.replace(/ /g, "")==""){
      alert("fournisseur invalide");
      document.getElementById('fournisseur').value="";
      return false;
    };
    if (listfourselectionn??.length==0){
      alert("fournisseur non selectionn??");
      return false;
    };
  
    if(date.replace(/ /g, "")==""){
      alert("date n'est pas choisi");
      document.getElementById('date').value="";
      return false;
    };
    console.log(id);

    for (let index = 1; index <= id; index++) {
      var var1=document.getElementById(index+"1").value;
      var var2=document.getElementById(index+"2").value;
      var var3=document.getElementById(index+"3").value;
 //     console.log(var1);
 //     console.log(var2);
 //     console.log(var3);

      if(var1==""){
        alert("inserer produit "+index);
        return false;
      }
      if(var2==""){
        alert("inserer quantit?? de produit "+index);
        return false;
      }
      if(var3==""){
        alert("inserer prix de produit "+index);
        return false;
      }

      
    };
    
  
    
  
  return true
  
  } 
const afficheidligneachat=()=>{
  console.log(listidligneachat)
}



  const [listidligneachat,setListidligneachat]=useState([])


  async function ajouterligneachat2 (idproduit,qte,prix){
  
    const response = await axios.post("http://localhost:3001/ligneAchat",{
    prix:Number(prix),
    qte:Number(qte),
    produit:idproduit
    }) 
    return response
      
   
      
   
}
async function ajouterligneachat(produit,qte,prix){

  const resp=await axios.post("http://localhost:3001/produit/nom",{
    nom:produit
  })
  return ajouterligneachat2(resp.data._id,qte,prix)

 


//console.log(resp);
 

}
  const creeligneachats=(index)=>{

    let list=[];
  
      var produit=recuperer_produit(index+"1");
      var qte=document.getElementById(index+"2").value;
      var prix=document.getElementById(index+"3").value;
      console.log(qte,prix)
     
      

      ajouterligneachat(produit,qte,prix).then(function(response) {
        console.log(list.concat(response.data));
        setListidligneachat(listidligneachat.concat([response.data]))

      });

      console.log(list);

        
     


  }
  
    const handleSubmit  = () => {
      if(valider()==true){
        var date=document.getElementById('date').value;
        
        console.log(listid);
        console.log(listidligneachat)

        axios.post("http://localhost:3001/factureF",{
          date:date ,
          fournisseur:listid.id,
          montant:calculertotal(),
          LigneAchat:listidligneachat
        }).catch((err)=>{
          console.log(err);
        });


        setListidligneachat([]);

     
         alert("enregistrer avec succ??e");
        reset();
      }
    }


    useEffect(()=>{
      getidfour();
      
    }, []);

function handleclick_show_four(event){
  event.preventDefault();
  show_four();
}
function handleclick_ajouter_ligne(event){
  event.preventDefault();
  ajouter_ligne();
}
function handleclick_supprimer_ligne(event){
  event.preventDefault();
  supprimer_ligne();
}
function handleclick_creeligneachats(event,index){
  event.preventDefault();
  creeligneachats(index);
}

   
  return (
    <>
    
    
      <CRow>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
                Cr??er facture
           
            </CCardHeader>
            
            <CImg
              src={'avatars/logo.png'}
              width="80%" height="30%"
              

            />
           
            <CCardBody>
              <CForm  method="post" encType="multipart/form-data" className="form-horizontal">
               
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">fournisseur  </CLabel>
                    <CButton id="show_four"size="sm" onClick={(e)=>{handleclick_show_four(e)}}><CIcon name="cil-chevron-bottom" /></CButton>

                  </CCol>
                  <CCol xs="12" md="9">

                  <CSelect   onChange={getidfour} name="select_fournisseur" id="fournisseur">
                  </CSelect>

                  <CFormText className="help-block">cliquer 2 fois pour afficher tout les fournisseurs</CFormText>

                  </CCol>
                </CFormGroup>
       

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Date de document</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date" name="date-input" placeholder="date" />
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="textarea-input" 
                      id="remarque" 
                      rows="3"
                      placeholder="Content..." 
                    />
                  </CCol>
                </CFormGroup>
               
               
              </CForm>
            </CCardBody>
            <CCardFooter >
            
            <CFormGroup>
              <CButton  size="sm" color="success"  onClick={handleSubmit}> enregistrer</CButton>
              <CButton type="reset" size="sm" color="danger"  onClick={reset}> reset</CButton>

            </CFormGroup>
            <CFormGroup>
            <CButton  size="sm" color="primary" id="download" onClick={generatePDF}> download pdf</CButton>

            </CFormGroup>
            </CCardFooter>
          </CCard>
          
        </CCol>
       
    
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
                produits ?? facturer
                <CButton size="sm" onClick={()=>{
                  show_prod("11");
                  show_prod("21");
                  show_prod("31");
                  show_prod("41");
                  show_prod("51");
                  show_prod("61");
                  }}>aff list produit<CIcon name="cil-chevron-bottom" /></CButton>
           
            </CCardHeader>
            <CCardBody>
              
               <table id="1" >
                   <thead></thead>
                   <tbody>
                   <tr>
                       <td width="25%">
                       <CFormGroup >
                                <CLabel htmlFor="text-input">Designation  </CLabel>
                                <CSelect    name="Designation" id="11">
                                </CSelect>

                        </CFormGroup>
                       </td>
                       <td width="25%">
                        <CFormGroup >
                                    <CLabel htmlFor="text-input">Quantit??  </CLabel>
                                    <CInput id="12" name="Quantit??" onChange={()=>settotalhtonchangequantit??("12")} placeholder="Quantit??" />
                            </CFormGroup>
                       </td>
                       <td width="25%">
                       <CFormGroup >
                            <CLabel htmlFor="text-input">Prix HT  </CLabel>
                            <CInput id="13"  name="Prix" onChange={()=>settotalhtonchangeprixht("13")} placeholder="Prix HT" />
                         </CFormGroup>
                        </td>
                        <td width="25%">
                        <CFormGroup >
                            <CLabel htmlFor="text-input">Total HT  </CLabel>
                            <CInput id="14"  name="Total" placeholder="Total HT " />
                        </CFormGroup>
                        </td>
                        <td width="25%">
                        <CFormGroup >
                        <CLabel htmlFor="text-input">save </CLabel>

                        <CButton  id="button1"size="sm" color="danger" onClick={(e)=>{handleclick_creeligneachats(e,"1")}}><CIcon name="cil-share" /> </CButton>

                        </CFormGroup>
                        </td>

                      
                   </tr>
                   
                 
                   </tbody>
                </table>
                <table id="2" style={{display:'none'}}>
                    <thead></thead>
                    <tbody>
                    <tr >
                       <td width="25%">
                       <CFormGroup >
                       <CSelect    name="Designation" id="21">
                                </CSelect>
                        </CFormGroup>
                       </td>
                       <td width="25%"> <CFormGroup >
                                   
                            <CInput id="22"  name="Quantit??" onChange={()=>settotalhtonchangequantit??("22")} placeholder="Quantit??" />
                            </CFormGroup></td>
                       <td width="25%"><CFormGroup >
                            <CInput id="23"  name="Prix" onChange={()=>settotalhtonchangeprixht("23")} placeholder="Prix HT" />
                         </CFormGroup></td>
                       <td width="25%">
                       <CFormGroup >
                            <CInput id="24"  name="Total" placeholder="Total HT " />
                        </CFormGroup>
                       </td>
                       <td width="25%">
                        <CFormGroup >
                        <CButton  id="button2"size="sm" color="danger" onClick={(e)=>{handleclick_creeligneachats(e,"2")}}><CIcon name="cil-share" /> </CButton>

                        </CFormGroup>
                        </td>

                   </tr>
                    </tbody>
                </table>

                <table id="3" style={{display:'none'}}>
                    <thead></thead>
                    <tbody>
                    <tr >
                       <td width="25%">
                       <CFormGroup >
                       <CSelect    name="Designation" id="31">
                                </CSelect>
                        </CFormGroup>
                       </td>
                       <td width="25%"> <CFormGroup >
                                   
                                    <CInput id="32"  name="Quantit??" onChange={()=>settotalhtonchangequantit??("32")} placeholder="Quantit??" />
                            </CFormGroup></td>
                       <td width="25%"><CFormGroup >
                            <CInput id="33"  name="Prix" onChange={()=>settotalhtonchangeprixht("33")} placeholder="Prix HT" />
                         </CFormGroup></td>
                       <td width="25%">
                       <CFormGroup >
                            <CInput id="34"  name="Total" placeholder="Total HT " />
                        </CFormGroup>
                       </td>
                       <td width="25%">
                        <CFormGroup >
                        <CButton  id="button3"size="sm" color="danger" onClick={(e)=>{handleclick_creeligneachats(e,"3")}}><CIcon name="cil-share" />  </CButton>

                        </CFormGroup>
                        </td>

                   </tr>
                    </tbody>
                </table>
                <table id="4" style={{display:'none'}}>
                    <thead></thead>
                    <tbody>
                    <tr >
                       <td width="25%">
                       <CFormGroup >
                       <CSelect    name="Designation" id="41">
                                </CSelect>
                        </CFormGroup>
                       </td>
                       <td width="25%"> <CFormGroup >
                                   
                                    <CInput id="42"  name="Quantit??" onChange={()=>settotalhtonchangequantit??("42")} placeholder="Quantit??" />
                            </CFormGroup></td>
                       <td width="25%"><CFormGroup >
                            <CInput id="43"  name="Prix" onChange={()=>settotalhtonchangeprixht("43")} placeholder="Prix HT" />
                         </CFormGroup></td>
                       <td width="25%">
                       <CFormGroup >
                            <CInput id="44"  name="Total" placeholder="Total HT " />
                        </CFormGroup>
                       </td>
                       <td width="25%">
                        <CFormGroup >
                        <CButton  id="button4"size="sm" color="danger" onClick={(e)=>{handleclick_creeligneachats(e,"4")}}><CIcon name="cil-share" />  </CButton>

                        </CFormGroup>
                        </td>

                   </tr>
                    </tbody>
                </table>
                <table id="5" style={{display:'none'}}>
                    <thead></thead>
                    <tbody>
                    <tr >
                       <td width="25%">
                       <CFormGroup >
                       <CSelect    name="Designation" id="51">
                                </CSelect>
                        </CFormGroup>
                       </td>
                       <td width="25%"> <CFormGroup >
                                   
                            <CInput id="52"  name="Quantit??" onChange={()=>settotalhtonchangequantit??("52")} placeholder="Quantit??" />
                            </CFormGroup>
                       </td>
                       <td width="25%"><CFormGroup >
                            <CInput id="53"  name="Prix" onChange={()=>settotalhtonchangeprixht("53")}placeholder="Prix HT" />
                         </CFormGroup></td>
                       <td width="25%">
                       <CFormGroup >
                            <CInput id="54"  name="Total" placeholder="Total HT " />
                        </CFormGroup>
                       </td>
                       <td width="25%">
                        <CFormGroup >
                        <CButton  id="button5"size="sm" color="danger" onClick={(e)=>{handleclick_creeligneachats(e,"5")}}><CIcon name="cil-share" />  </CButton>

                        </CFormGroup>
                        </td>

                   </tr>
                    </tbody>
                </table>
                <table id="6" style={{display:'none'}}>
                    <thead></thead>
                    <tbody>
                    <tr >
                       <td width="25%">
                       <CFormGroup >
                       <CSelect    name="Designation" id="61">
                                </CSelect>
                        </CFormGroup>
                       </td>
                       <td width="25%"> <CFormGroup >
                                   
                                    <CInput id="62" name="Quantit??" onChange={()=>settotalhtonchangequantit??("62")} placeholder="Quantit??" />
                            </CFormGroup></td>
                       <td width="25%"><CFormGroup >
                            <CInput id="63" name="Prix" onChange={()=>settotalhtonchangeprixht("63")} placeholder="Prix HT" />
                         </CFormGroup></td>
                       <td width="25%">
                       <CFormGroup >
                            <CInput id="64" name="Total" placeholder="Total HT " />
                        </CFormGroup>
                       </td>
                       <td width="25%">
                        <CFormGroup >
                        <CButton  id="button6"size="sm" color="danger" onClick={(e)=>{handleclick_creeligneachats(e,"6")}}><CIcon name="cil-share" />  </CButton>

                        </CFormGroup>
                        </td>

                   </tr>
                    </tbody>
                </table>

               
            
            </CCardBody>
            <CCardFooter >
             
                <CButton  id="button2" size="sm" color="primary" onClick={(e)=>{handleclick_ajouter_ligne(e)}}><CIcon name="cil-scrubber" /> Ajouter produit</CButton>
                <CButton  id="button3"size="sm" color="danger" onClick={(e)=>{handleclick_supprimer_ligne(e)}}><CIcon name="cil-scrubber" /> supprimer produit</CButton>
                

            </CCardFooter>
           
          </CCard>
          
        </CCol>
       
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CButton type="submit" size="sm" color="primary" onClick={affichefactures}>afficher les liste des factures</CButton>

            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={listfactures.factures}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
             
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal 
              show={danger} 
              onClose={() => setDanger(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>connection failed</CModalTitle>
              </CModalHeader>
              <CModalBody>
               Data base server is curently down for maintenance
              </CModalBody>
            
      </CModal>

    
   
    </>
  )
 

}
/*
const button1=document.getElementById("show_four");
button1.addEventListener('click',function(e){
  e.preventDefault();
  console.log("hello")
});
*/
export default BasicForms

