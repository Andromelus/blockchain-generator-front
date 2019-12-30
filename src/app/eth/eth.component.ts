import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-eth',
  templateUrl: './eth.component.html',
  styleUrls: ['./eth.component.css'],
  animations: []
})
export class EthComponent implements OnInit {

  //static elements
  _UNAVAILABLE_CHAIN_IDS: object = {
    0: "Olympic, Ethereum public pre-release PoW testnet",
    1: "Frontier, Homestead, Metropolis, the Ethereum public PoW main network",
    2: ["Expanse, an alternative Ethereum implementation",
      "Morden Classic, the public Ethereum Classic PoW testnet"],
    3: "Ropsten, the public cross-client Ethereum PoW testnet",
    4: "Rinkeby, the public Geth-only PoA testnet",
    5: "Goerli, the public cross-client PoA testnet",
    6: "Kotti Classic, the public cross-client PoA testnet for Classic",
    8: "Ubiq, the public Gubiq main network with flux difficulty",
    10: "Quorum, the JP Morgan network",
    42: "Kovan, the public Parity-only PoA testnet",
    60: "GoChain, the GoChain networks mainnet",
    61: "Classic, the (un)forked public Ethereum Classic PoW main network",
    77: "Sokol, the public POA Network testnet",
    99: "Core, the public POA Network main network",
    100: "xDai, the public MakerDAO/POA Network main network",
    31337: "GoChain testnet, the GoChain networks public testnet",
    401697: "Tobalaba, the public Energy Web Foundation testnet",
    7762959: "Musicoin, the music blockchain",
    61717561: "Aquachain, ASIC resistant chain"
  }



  chainId: number;

  carousel: any;

  ethashCheck: any;
  cliqueCheck: any;

  timestampInput: any;
  timestampDate: any;

  nonceHex: any;
  nonceInput: any;

  extradataInputIndex: number;
  extradataAdd: any;

  gasLimitInput: any;
  gasLimitHex: any;

  difficultyInput: any;
  difficultyHex: any;

  allocInputIndex: number;
  allocAdd: any;
  allocHex: any;

  constructor() {
  }

  ngOnInit() {
    this.carousel = $("#eth-genesis-carousel .carousel-inner");
    this.ethashCheck = $('#eth-genesis-ethash');
    this.cliqueCheck = $('#eth-genesis-clique');
    this.timestampDate = $('#eth-timestamp-date');
    this.timestampInput = $('#eth-timestamp');
    this.nonceHex = $('#eth-nonce-hex');
    this.nonceInput = $('#eth-nonce');
    this.extradataInputIndex = 1;
    this.extradataAdd = $('#eth-extradata-add');
    this.gasLimitInput = $('#eth-gas-limit');
    this.gasLimitHex = $('#eth-gas-limit-hex');
    this.difficultyInput = $('#eth-difficulty');
    this.difficultyHex = $('#eth-difficulty-hex');
    this.allocInputIndex = 1;
    this.allocAdd = $('#eth-alloc-add');
    this.allocHex = $('#eth-alloc-0-hex');

    // $('#carousel-next-btn').on('click', (event) => {
    //   event.preventDefault();
    //   this.carouselNext();
    // });
    // $('#carousel-prev-btn').on('click', (event) => {
    //   event.preventDefault();
    //   this.carouselPrev();
    // });

    // algorithm
    this.cliqueCheck.on('click', () => {
      if (this.ethashCheck.is(':checked')) {
        this.ethashCheck.prop('checked', false);
      }
    });
    this.ethashCheck.on('click', () => {
      if (this.cliqueCheck.is(':checked')) {
        this.cliqueCheck.prop('checked', false);
      };
    });

    //timestamp
    let date = Math.round(Date.now() / 1000);
    this.timestampInput.val(date);
    let dateMs = new Date(date * 1000);
    this.timestampDate.text(dateMs.getDate() + ' ' + dateMs.getMonth() + ' ' + dateMs.getFullYear() + ' ' + dateMs.getHours() + ':' + dateMs.getMinutes());


    this.timestampInput.on('change', () => {
      let date = new Date(parseInt(this.timestampInput.val()) * 1000);
      this.timestampDate.text(date.getDate() + ' ' + date.getMonth() + ' ' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes());
    });


    // nonce
    this.nonceInput.on('change', () => {
      let nonce = parseInt(this.nonceInput.val()).toString(16);
      this.nonceHex.text("0x" + nonce);
    });


    //extradata
    this.extradataAdd.on('click', () => {
      $(`#eth-extradata-${this.extradataInputIndex - 1}`)
        .after(`<input id="eth-extradata-${this.extradataInputIndex}" type="text" class="form-control"
      placeholder="Extradata" aria-label="Extradata"
      aria-describedby="basic-addon1">`);
      this.extradataInputIndex++;
    });

    //gaslimit
    this.gasLimitInput.on('change', () => {
      this.gasLimitHex.text("0x" + parseInt(this.gasLimitInput.val()).toString(16));
    });

    //difficulty
    this.difficultyInput.on('change', () => {
      this.difficultyHex.text("0x" + parseInt(this.difficultyInput.val()).toString(16));
    });

    $('#eth-alloc-0-balance').on('change', () => {
      this.allocHex.text("0x" + parseInt($('#eth-alloc-0-balance').val()).toString(16));
    });
    //alloc
    this.allocAdd.on('click', () => {
      $(`#eth-alloc-${this.allocInputIndex - 1}`)
        .after(`<div id="eth-alloc-${this.allocInputIndex}" class="input-group mb-3">
      <div class="input-group-prepend">
          <input id="eth-alloc-${this.allocInputIndex}-address" type="text" class="form-control"
          placeholder="Address" aria-label="Address"
          aria-describedby="basic-addon1">
      </div>
      <input id="eth-alloc-${this.allocInputIndex}-balance" type="number" min="1" class="form-control"
      placeholder="Value" aria-label="Alloc"
      aria-describedby="basic-addon1">
      <span id="eth-alloc-${this.allocInputIndex}-hex" class="input-group-text">0x0</span>
  </div>`);

      $(`#eth-alloc-${this.allocInputIndex}-balance`).data("index", this.allocInputIndex);
      $(`#eth-alloc-${this.allocInputIndex}-balance`).on('change', function () {
        let jqObj = $(this);
        let index = jqObj.data("index");
        $(`#eth-alloc-${index}-hex`).text("0x" + parseInt($(`#eth-alloc-${index}-balance`).val()).toString(16));
      });
      this.allocInputIndex++;
    })

  }

  //TODO
  carouselNext() {
    this.chainId = $('#eth-chain-id').val();
    if (this._UNAVAILABLE_CHAIN_IDS[this.chainId] !== undefined) {
      console.log("IT ALREADY exists!");
    } else {
      this.carousel.carousel('next');
    }

  }
  carouselPrev() {
    this.carousel.carousel('prev');
  }



}
