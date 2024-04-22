import ContenedorAdmin from "./ContenedorAdmin";


const AdminPanel = () =>{

    const vigias = ["carlos", "fulano", "mengano"]

    return(
        <>
        <div className="py-32">
            <ContenedorAdmin
            nombre={"Test"}
            listaDeVigias={vigias}
        >

        </ContenedorAdmin>
        </div>
        </>
    )
}

export default AdminPanel;