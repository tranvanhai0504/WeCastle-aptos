export const Compare = (address1:string,address2:string,num:number):boolean=>{
    return address1.slice(-num).toLowerCase() === address2.slice(-num).toLowerCase();

}