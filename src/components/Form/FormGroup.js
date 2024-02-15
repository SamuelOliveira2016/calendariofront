import React from "react";

export default ({
    label, 
    id, 
    name,
    classCss = "form-control", 
    type = "text",
    value, 
    setValue,
    placeholder = null,
    funChange = null,
    children
}) => {

    // Define uma função handleChange padrão se funChange não for passada
    const handleChange = funChange || ((e) => setValue(e.target.value));

    return (
        <div className="form-group">
            <label htmlFor={id} className="form-control-label">
                {label}
            </label>

            {type !== "textarea" && type !== "select" ? (
                <input 
                    className={classCss}
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            ) : type === "textarea" ? (
                <textarea
                    className={classCss}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            ) : (
                // Placeholder para um futuro campo select
                // Lembre-se de adicionar a lógica para renderizar as opções do select aqui
                <select 
                    className={classCss}
                    id={id}
                    name={name}
                    value={value}
                    onChange={handleChange}>
                   {children}
                </select>
            )}
        </div>
    );
}