"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
dotenv_1.default.config();
// connect to database
(0, db_1.default)();
const app = (0, express_1.default)();
// Body parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// API routes
app.use('/api/user', userRoutes_1.default);
app.use('/api/patient', patientRoutes_1.default);
// deployment configuration
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, 'frontend', 'build', 'index.html')));
}
// Middleware
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map