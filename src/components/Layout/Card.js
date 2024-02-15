import React from 'react';

export default ({titulo = "", children}) => {
    return (
        <div class="card mb-4 p-3">
            {titulo && (
                <div class="card-header pb-0" style={{padding: 0}}>
                    <h4>{titulo}</h4>
                </div>
            )}
            <div class="card-body px-0 pt-0 pb-2">
                {children}
            </div>
        </div>
    )
}