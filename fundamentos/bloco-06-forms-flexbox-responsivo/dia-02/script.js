const dateOptions = {
  mondayFirst: false,
  format: 'dd/mm/yyyy',
  minDate: new Date().getDate(),
  maxDate: new Date(2030, 11, 31),
  weekDayLabels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  shortMonthLabels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  singleMonthLabels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  todayButton: true,
  todayButtonLabel: 'Hoje',
  clearButton: true,
  clearButtonLabel: 'Limpar',
  titleFormatDay: 'dd, MM, yyyy',
  titleFormatMonth: 'MM yyyy',
  titleFormatYear: 'yyyy'
};

let dateInput = document.querySelector('#input-data');
dateInput.DatePickerX.init(dateOptions);

const validation = new JustValidate('#form', {
  tooltip: {position: 'bottom'},
});

validation
  .addField('#nome-completo', [
    {
      rule: 'required',
      errorMessage: 'Este campo é obrigatório.',
    },
    {
      rule: 'minLength',
      value: 10,
      errorMessage: 'Este campo requer no mínimo 10 caractéres',
    },
    {
      rule: 'maxLength',
      value: 40,
    },
  ])
  .addField('#input-email', [
    {
      rule: 'required',
      errorMessage: 'Este campo é obrigatório.',
    },
    {
      rule: 'email',
      errorMessage: 'Digite um email válido',
    },
    {
      rule: 'minLength',
      value: 10,
      errorMessage: 'Este campo requer no mínimo 10 caractéres',
    },
    {
      rule: 'maxLength',
      value: 50,
    },
  ])
  .addRequiredGroup(
    '#radio-group', 
    'Selecione um local.'
    )
  .addField('#porque-voce', [
    {
      rule: 'maxLength',
      value: 500,
    },
  ])
  .addField('#input-data', [
    {
      rule: 'required',
      errorMessage: 'Este campo é obrigatório.',
    },
  ])
  .addField('#termos', [
    {
      rule: 'required',
      errorMessage: 'Você precisa concordar com os termos de compartilhamento de imagens.',
    },
  ]);
