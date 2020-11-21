"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
var model_user_1 = __importStar(require("../../models/model.user"));
var error_handler_1 = require("../../routes/error-handler");
var LoginService = /** @class */ (function () {
    function LoginService() {
    }
    LoginService.prototype.login = function (req, res) {
        this.findAndauthenticateUser(req.body, res);
    };
    LoginService.prototype.getProfile = function () {
    };
    LoginService.prototype.signup = function (req, res) {
        this.createNewUser(req.body).then(function (t) {
            error_handler_1.handleSuccess(res, {}, 201);
        }).catch(function (e) {
            error_handler_1.handleError(res, ['User already exist'], 409);
        });
    };
    LoginService.prototype.createNewUser = function (_a) {
        var email = _a.email, name = _a.name, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, model_user_1.default.create({
                            name: name,
                            email: email,
                            password: password
                        })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    LoginService.prototype.findAndauthenticateUser = function (_a, res) {
        var _this = this;
        var email = _a.email, password = _a.password;
        model_user_1.default.findOne({ email: email }).then(function (user) {
            console.log(user);
            if (user) {
                if (model_user_1.comparePassword(password, user.password)) {
                    _this.loginSuccessHandler(email, res);
                }
                else {
                    error_handler_1.handleError(res, ['Incorrect password'], 403);
                }
            }
            else {
                error_handler_1.handleError(res, ['User doesn\'t exist'], 404);
            }
        }, function (err) {
            error_handler_1.handleError(res);
        });
    };
    LoginService.prototype.loginSuccessHandler = function (email, res) {
        error_handler_1.handleSuccess(res, { login: true });
    };
    LoginService.prototype.confirmEmail = function () {
    };
    LoginService.prototype.resetPassword = function () {
    };
    LoginService.prototype.confirmResetPassword = function () {
    };
    return LoginService;
}());
exports.LoginService = LoginService;
