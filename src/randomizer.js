const messages = [
        'I need more :coffee: to work',
        'Hello there :simple_smile:',
        "It's time to :shipit:",
        "Robert approves :robert_approved:",
        'Ouch!! long click hurts man.',
];

export const message = () => {
    const randomNumber = Math.floor(Math.random()*messages.length);
    return messages[randomNumber];
}
