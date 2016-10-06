var messages = [
        'I need more :coffee: to work',
        'Hello there :simple_smile:',
        "It's time to :shipit:",
        "Robert approves :robert_approved:",
        'Ouch!! long click hurts man.',
];

var message = () => {
    var randomNumber = Math.floor(Math.random()*messages.length);
    return messages[randomNumber];
}

module.exports = {
    message: message,
};
