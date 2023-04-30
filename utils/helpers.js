import hbs from 'hbs';

hbs.registerHelper("myIf", function (v1, v2, option) {
    if (v1 == v2) {
        return option.fn(this);
    } else {
        return option.inverse(this);
    };
});