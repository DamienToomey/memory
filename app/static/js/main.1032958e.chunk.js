(this.webpackJsonpmemory=this.webpackJsonpmemory||[]).push([[0],[,,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(1),r=n.n(s),c=n(7),i=n.n(c),l=n(9),d=n(3),u=n(2),o=n(5),h=n(4),j=n(8),b=n.n(j),f=(n(16),n(17),function(e){var t=e.card,n=e.feedback,s=e.index,r=e.onClick;return Object(a.jsx)("div",{className:"card ".concat(n),role:"button",onClick:function(){return r(s)},tabIndex:0,onKeyDown:function(e){13===e.keycode&&r(s)},children:Object(a.jsx)("span",{className:"symbol",children:"hidden"===n?"\u2753":t})})}),m=(n(18),function(e){var t=e.guesses;return Object(a.jsx)("div",{className:"guesses",children:t})}),g=(n(19),function(e){var t=e.entries;return Object(a.jsx)("table",{className:"hallOfFame",children:Object(a.jsx)("tbody",{children:t.map((function(e){var t=e.date,n=e.guesses,s=e.id,r=e.player;return Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{className:"date",children:t}),Object(a.jsx)("td",{className:"guesses",children:n}),Object(a.jsx)("td",{className:"player",children:r})]},s)}))})})}),p="::Memory::HallOfFame";n(20);var O=function(e){Object(o.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).handleWinnerUpdate=function(e){a.setState({winner:e.target.value.toUpperCase()})},a.persistWinner=function(e){e.preventDefault();var t=a.props,n=t.guesses,s=t.onStored;!function(e,t){var n={guesses:e.guesses,player:e.player,date:(new Date).toLocaleDateString(),id:Date.now()},a=JSON.parse(localStorage.getItem(p)||"[]"),s=a.findIndex((function(e){return e._guesses>=n.guesses}));-1===s?a.push(n):a.splice(s,0,n),a.length>10&&a.splice(10,a.length),localStorage.setItem(p,JSON.stringify(a)),t(a)}({guesses:n,player:a.state.winner},s)},a.state={winner:""},a}return Object(u.a)(n,[{key:"render",value:function(){var e=this.state.winner;return Object(a.jsx)("form",{className:"highScoreInput",onSubmit:this.persistWinner,children:Object(a.jsxs)("p",{children:[Object(a.jsxs)("label",{htmlFor:"input_winner_information",children:["Well done! Please enter your name:",Object(a.jsx)("input",{autoComplete:"given-name",onChange:this.handleWinnerUpdate,type:"text",value:e,id:"input_winner_information"})]}),Object(a.jsx)("button",{type:"submit",children:"I have won!"})]})})}}]),n}(s.Component),v=function(e){Object(o.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).handleCardClick=function(e){var t=a.state.currentPair;2!==t.length&&(0!==t.length?a.handleNewPair(e):a.setState({currentPair:[e]}))},a.displayHallOfFame=function(e){a.setState({hallOfFame:e})},a.state={cards:n.generateCards(),currentPair:[],guesses:0,hallOfFame:null,matchedCardIndices:[]},a.feedbacks=Array(36).fill("hidden"),a}return Object(u.a)(n,null,[{key:"generateCards",value:function(){for(var e=[],t=Array.from("\ud83d\ude00\ud83c\udf89\ud83d\udc96\ud83c\udfa9\ud83d\udc36\ud83d\udc31\ud83e\udd84\ud83d\udc2c\ud83c\udf0d\ud83c\udf1b\ud83c\udf1e\ud83d\udcab\ud83c\udf4e\ud83c\udf4c\ud83c\udf53\ud83c\udf50\ud83c\udf5f\ud83c\udf7f");e.length<36;){var n=t.pop();e.push(n,n)}return b()(e)}}]),Object(u.a)(n,[{key:"handleNewPair",value:function(e){var t=this,n=this.state,a=n.cards,s=n.currentPair,r=n.guesses,c=n.matchedCardIndices,i=[s[0],e],d=r+1,u=a[i[0]]===a[i[1]];this.setState({currentPair:i,guesses:d}),u&&this.setState({matchedCardIndices:[].concat(Object(l.a)(c),i)}),setTimeout((function(){return t.setState({currentPair:[]})}),500)}},{key:"getFeedbackForCard",value:function(e){var t=this.state,n=t.currentPair,a=t.matchedCardIndices.includes(e),s=this.feedbacks[e],r="";return"justMatched"===s||"disabled"===s?r="disabled":n.length<2?r=n.includes(e)?"visible":"hidden":2===n.length&&(r=n.includes(e)?a?"justMatched":"justMismatched":a?"visible":"hidden"),this.feedbacks[e]=r,r}},{key:"render",value:function(){var e=this,t=this.state,n=t.cards,s=t.guesses,r=t.hallOfFame,c=4===t.matchedCardIndices.length;return Object(a.jsxs)("div",{className:"memory",children:[Object(a.jsx)(m,{guesses:s}),n.map((function(t,n){return Object(a.jsx)(f,{card:t,feedback:e.getFeedbackForCard(n),index:n,onClick:e.handleCardClick},n)})),c&&(r?Object(a.jsx)(g,{entries:r}):Object(a.jsx)(O,{guesses:s,onStored:this.displayHallOfFame}))]})}}]),n}(s.Component),y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),r(e),c(e)}))};i.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(v,{})}),document.getElementById("root")),y()}],[[21,1,2]]]);
//# sourceMappingURL=main.1032958e.chunk.js.map