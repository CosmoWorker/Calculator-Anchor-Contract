import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";
import { assert } from "chai";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  const provider=anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const newAccount =  anchor.web3.Keypair.generate();

  const program = anchor.workspace.Calculator as Program<Calculator>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
    .init()
    .accounts({
      signer: provider.wallet.publicKey,
      account: newAccount.publicKey
    })
    .signers([newAccount])
    .rpc();
    console.log("Your transaction signature", tx);

    const account= await program.account.dataShape.fetch(newAccount.publicKey);
    assert(account.data == 1);
  });

  it("Is double", async()=>{
    const tx = await program.methods.double()
    .accounts({
      signer: provider.wallet.publicKey,
      account: newAccount.publicKey
    })
    .rpc();

    console.log("Your transaction signature", tx);
    const account=await program.account.dataShape.fetch(newAccount.publicKey);
    assert.equal(account.data, 2);
  });

  it("Is half", async()=>{
    const tx=await program.methods.half()
    .accounts({
      signer: provider.wallet.publicKey,
      account: newAccount.publicKey
    })
    .rpc();

    console.log("Your transaction signature", tx);
    const account = await program.account.dataShape.fetch(newAccount.publicKey);
    assert(account.data==1);
  });

  it("Is Added", async()=>{
    const tx= await program.methods.add(2)
    .accounts({
      signer: provider.wallet.publicKey,
      account: newAccount.publicKey
    })
    .rpc();

    const account=await program.account.dataShape.fetch(newAccount.publicKey);
    assert.equal(account.data, 3);
  })

  it("Is subtracted", async()=>{
    const tx=await program.methods.sub(1)
    .accounts({
      signer: provider.wallet.publicKey,
      account: newAccount.publicKey
    })
    .rpc();

    console.log("Your transaction signature is ", tx);
    const account=await program.account.dataShape.fetch(newAccount.publicKey);
    assert(account.data==2);
  })
});
