/**
 * Логика инициализации слушателя, слушать можно все.
 * Какойто брокер, gRPC, SOAP, кастомный TCK протокол написанный
 * на асемблере и php - главное слущатель должен быть EventEmmiter, с событием message.
 * У нас простой слущатель http.
 */

import HttpListner from './httpListner.js';

export default (params = {}) => new HttpListner(params);
