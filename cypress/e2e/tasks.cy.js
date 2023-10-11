/// <reference types='cypress' />

describe('tarefas', () => {

    let testData;

    before(()=> {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {

            //Massa
            const taskName = 'Ler um livro de JavaScript'
    
            cy.removeTaskByName(taskName)
    
            //Função Personalizada - tasnName é o valor da massa
            cy.createTask(taskName)
    
            cy.contains('main div p', taskName)
                .should('be.visible')
        })
        it('não deve permitir tarefa duplicada', () => {
    
            //Massa
            const task = testData.dup
    
            cy.removeTaskByName(task.name)
    
            //Dado que eu tenho uma tarefa  duplicada
            cy.postTask(task)
    
            //Quando faço o cadastro dessa tarefa
            //Função Personalizada - tasnName é o valor da massa
            cy.createTask(task.name)
    
            //Então vejo a mensagem de duplicidade
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })
        it('validar mensagem de aviso do preenchimento do campo obrigatório', ()=> {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })
    context('atualização', () => {
        it('deve concluir uma tarefa', () => {

            const task = {
                name: 'Pagar contas de consumo',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()
            
            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })
    context('exclusão', () => {
        it('deve remover uma tarefa', () => {

            const task = {
                name: 'Comprar um carro',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()
            
            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})