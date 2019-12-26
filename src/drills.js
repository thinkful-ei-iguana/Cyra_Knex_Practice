require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchByProduceName(searchTerm) {
  knexInstance
    .select('name', 'price', 'category')
    .from('shopping_list')
    .where('name', 'LIKE', `%${searchTerm}%`)
   
    .then(result => {
      console.log(result);
    });
}  
  
searchByProduceName('tricks');

function paginateProducts(pageNumber) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber -1);
  knexInstance
    .select('name', 'price', 'category')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}
  
paginateProducts(2);

function addedAfter(daysAgo) {
  knexInstance
    .select('date_added')
    .where('date_added', '<', knexInstance.raw('now() - \'?? days\'::INTERVAL', daysAgo)
    )
    .from('shopping_list')    
    .then(result => {
      console.log(result);
    });
}    
  
addedAfter(9);
  
function groupByCategoryAndTotaled() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')

    .then(result => {
      console.log('COST PER CATEGORY');
      console.log(result);
    });
}
  
groupByCategoryAndTotaled();