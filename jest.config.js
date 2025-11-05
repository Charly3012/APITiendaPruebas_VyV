module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Directorios donde Jest buscará las pruebas
    roots: ['<rootDir>/src'],
    // Patrón de archivos de prueba
    testMatch: [
        '**/__tests__/**/*.+(ts|js)',
        '**/?(*.)+(spec|test).+(ts|js)'
    ],
    // Transformadores (para TypeScript)
    transform: {
        '^.+\\.(ts)$': 'ts-jest'
    },
};