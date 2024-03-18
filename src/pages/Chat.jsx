import ScrollableFeed from "react-scrollable-feed";
import Mensagem from "../components/Mensagem";
import './chat.css';
import { useEffect, useState, useRef } from "react";
import EmojiPicker from 'emoji-picker-react'

export default function Chat() {

    const usuario = localStorage.getItem('usuario')

    const [mensagens, setMensagens] = useState([]);

    const [mensagem, setMensagem] = useState('');

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const feedRef = useRef();

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prevState) => !prevState);
    };

    const handleEmojiSelect = (emoji) => {
        setMensagem((prevText) => prevText + emoji.emoji);
    };

    const handleOutsideClick = (event) => {
        if (event.target.closest(".emoji-picker")) return;
        setShowEmojiPicker(false);
    };

    const handleKeyPress = (evento) => {
        if (evento.key === 'Enter') {
            EnviarMensagem();
        }
    };


    const [wss, setWs] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('wss://chat-oculto-back-ws.onrender.com')

        setWs(ws)

        ws.onopen = (event) => {
            console.log(`Conexão aberta! ${event}`)
        }

        ws.onmessage = function (event) {

            const mensagem = JSON.parse(event.data);

            setMensagens((prevMessages) => [...prevMessages, mensagem]);
        }

        ws.onerror = (event) => {
            console.log('Error in connection')
        }

        return () => {
            ws.close()
        }

    }, [])

    function EnviarMensagem() {

        if (mensagem.length != 0) {
            const novaMensagem = {
                autor: usuario,
                texto: mensagem
            }

            wss.send(JSON.stringify(novaMensagem));


            setMensagem('');

            if (feedRef.current) {
                feedRef.current.scrollToBottom();
            }
        }

    }

    return (
        <>
            <main className="d-flex w-100 flex-column">

                <section style={{
                    flex: 1,
                    maxHeight: '86vh',
                }}>
                    <ScrollableFeed ref={feedRef}>
                        <div className="d-flex flex-column gap-1 p-2">
                            {
                                mensagens.map((mensagem, idx) => (
                                    usuario == mensagem.autor ?
                                        <div className="d-flex justify-content-end" key={idx}>
                                            <Mensagem informacoes={mensagem} estilizacao={{ background: '#005c4b', color: 'white' }} />
                                        </div>
                                        :
                                        <div className="d-flex justify-content-start" key={idx}>
                                            <Mensagem informacoes={mensagem} estilizacao={{ background: '#202c33', color: 'white' }} />
                                        </div>
                                ))
                            }
                        </div>
                    </ScrollableFeed>
                </section>

                <div className="emoji-picker d-flex flex-column" style={{ position: 'absolute', top: '13%' }}>
                    {showEmojiPicker && (
                        <EmojiPicker onEmojiClick={handleEmojiSelect} searchDisabled />
                    )}
                </div>

                <footer className="d-flex p-2 gap-1"
                    style={{
                        backgroundColor: '#202c33',
                        position: 'absolute',
                        bottom: 0,
                        width: '100%'
                    }}>

                    <button id="bt" onClick={toggleEmojiPicker}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#8696a0" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                        </svg>
                    </button>

                    <input
                        id="campo"
                        className="w-100 form-control"
                        required
                        placeholder="Digite uma mensagem"
                        value={mensagem}
                        onClick={handleOutsideClick}
                        onKeyPress={handleKeyPress}
                        onChange={e => setMensagem(e.target.value)} />

                    <button id="bt" onClick={() => EnviarMensagem()}>
                        Enviar
                    </button>
                </footer>

            </main >
        </>
    );
}