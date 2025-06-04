const fs = require('fs'),
    path = require('path');

const Content = require('../builder/Content');

module.exports = function* (grunt){
    // load the products json
    //const catalog = JSON.parse(fs.readFileSync(path.join(path.dirname(require.main.filename), '/etc/products.json'),'utf8'));
    const catalog = grunt.file.readJSON('etc/products.json');

    // loop categories
    for(let i in catalog) {
        let category = catalog[i];

        if(category.hasOwnProperty('active') && category.active === false) continue;
        category.active = true;

        let cat = new Content(category.slug + '.xht', {});
        //cat.data.id = category.slug;
        //cat.data.basename = category.slug;
        cat.data.frontmatter = {
            title: category.title,
            show_h1: true,
            template: 'category',
            breadcrumb:[
                    {title: 'Home', link: '/'},
                    {title: category.title, link: '/' + category.slug + '.html', active: true}
                ],

            category: category
        };

        yield cat;


        for(let j in category.items) {
            let product = category.items[j];

            if(product.hasOwnProperty('active') && product.active === false) continue;
            product.active = true;

            let prod = new Content(product.slug + '.xht', {});
            //prod.data.id = product.slug;
            //prod.data.basename = product.slug;
            prod.data.frontmatter = {
                title: product.title,
                show_h1: true,
                template: 'product',
                breadcrumb:[
                    {title: 'Home', link: '/'},
                    {title: category.title, link: '/' + category.slug + '.html'},
                    {title: product.title, link: '/' + product.slug + '.html', active: true}
                ],

                product: product
            };

            yield prod;

        }

    }

}


// content:
// data.id = slug
// data.frontmatter...
// data.tmpl = '' // unused
// filepath = ''
// meta = {}
