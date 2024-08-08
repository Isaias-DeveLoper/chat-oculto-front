export default function Mensagem({ informacoes, estilizacao }) {

    const usuario = localStorage.getItem('usuario')

    return (
        <>
            <div className="p-2  rounded w-50"
                style={{
                    backgroundColor: [estilizacao.background],
                    color: [estilizacao.color],
                    marginLeft:'15px',
                    marginRight:'15px'
                }}
            >
                <main className="text-break">
                    {informacoes.texto}
                </main>
            </div>
        </>
    );
}
