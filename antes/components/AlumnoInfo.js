function AlumnoInfo({ alumno }) {
    const { useState } = React;
    const [visible, setVisible] = useState(false);

    return (
        <div className="alumno-card">
            <button onClick={() => setVisible(!visible)}>
                {visible ? "Ocultar Info" : "Mostrar Info"}
            </button>
            {visible && (
                <div>
                    <p><strong>Nombre:</strong> {alumno.nombre}</p>
                    <p><strong>Calificación:</strong> {alumno.calificacion}</p>
                </div>
            )}
        </div>
    );
}