import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from './_services';
import {User} from './_models';

import {L10n, setCulture} from '@syncfusion/ej2-base';

setCulture('pt_br');

L10n.load({
  'pt_br': {
    'grid': {
      'EmptyRecord': 'Nenhum registro para exibir',
      'EmptyDataSourceError': 'A fonte de dados deve ficar em branco no carregamento inicial, pois as colunas da fonte de dados são criadas na coluna Gerada automaticamente da grade',
      'GroupDropArea': 'Arraste um cabeçalho de coluna aqui para a coluna do grupo',
      'UnGroup': 'Clique aqui para desagrupar',
      'Item': 'Artigo',
      'Items': 'Artigo',
      'StartsWith':'Começa com',
      'EndsWith':'Termina com',
      'Contains':'Contém',
      'Equal':'Igual',
      'NotEqual':'Não igual',
      'LessThan':'Menor que',
      'LessThanOrEqual':'Menor ou igual',
      'GreaterThan':'Maior que',
      'GreaterThanOrEqual':'Maior que ou igual',
      'ChooseDate':'Escolha a data',
      'EnterValue':'Digite o valor',
      'Copy':'Cópia de',
      'FilterMenu':'Menu Filtro',
      'ClearFilter':'Filtro limpo',
      'ClearButton':'Limpar',
      'FilterButton':'filtrar',

    },
    'pager': {
      'currentPageInfo': '{0} de {1} páginas',
      'totalItemsInfo': '({0} itens)',
      'firstPageTooltip': 'Vá para a primeira página',
      'lastPageTooltip': 'Ir para a última página',
      'nextPageTooltip': 'Vá para a próxima página',
      'previousPageTooltip': 'Vá para a página anterior',
      'nextPagerTooltip': 'Ir para o próximo pager',
      'previousPagerTooltip': 'Vá para o Pager anterior'
    }
  }
});
@Component({selector: 'app', templateUrl: 'app.component.html', styleUrls: ['./app.component.scss']})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
