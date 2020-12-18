import { expect } from 'chai'
import React from "react"
import ReactDOM from "react-dom"
import App from "../App"
import sinon from 'sinon'

describe('<index />', () => {
    it("renders with App and root div", () => {
        // create a spy on the render method
        // so that we can assert that render is
        // called with <App /> and HTML element with id = root
        sinon.spy(ReactDOM, 'render');

        // Create and append to document body
        // an HTML element with id = root
        const div = document.createElement("div")
        div.id = "root"
        document.body.appendChild(div)

        // Requires index.js so that react-dom render method is called
        require("../index.js")

        // Asserts render was called with <App />
        // and HTML element with id = root
        expect(ReactDOM.render).to.have.been.calledWith(
            <React.StrictMode><App /></React.StrictMode>,
            div
        )
    })
})