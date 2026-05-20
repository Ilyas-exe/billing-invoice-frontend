export type TypeCreancier = 'IAM' | 'BANQUE' | 'ONEE' | 'CLINIQUE' | 'AUTRE'

export interface Creancier {
type_creancier: TypeCreancier
createdDate: string|number|Date
created_date: string|number|Date
    id : number
    nom : string
    typeCreancier: TypeCreancier
    ice : string 
    rc : string
    rib : string
    banque : string
    email : string
    telephone : string
    adresse : string
}