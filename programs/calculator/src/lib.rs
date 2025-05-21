use anchor_lang::prelude::*;

declare_id!("7kWzF7SD11UZXjyLjacwgupgsH1SoxhujKx1npf4rcq8");

#[program]
pub mod calculator {
    use super::*;

    pub fn init(ctx: Context<Initialize>)->Result<()>{
        ctx.accounts.account.data=1;
        Ok(())

    }

    pub fn add(ctx: Context<Add>, num: u32)->Result<()>{
        ctx.accounts.account.data = ctx.accounts.account.data + num;
        Ok(())
    }

    pub fn half(ctx: Context<Half>)->Result<()>{
        ctx.accounts.account.data = ctx.accounts.account.data/2;
        Ok(())

    }

    pub fn double(ctx: Context<Double>)->Result<()>{
        ctx.accounts.account.data= ctx.accounts.account.data*2;
        Ok(())
    }

    pub fn sub(ctx: Context<Sub>, num: u32)-> Result<()>{
        ctx.accounts.account.data = ctx.accounts.account.data - num;
        Ok(())
    }
}


#[account]
pub struct DataShape{
    data: u32,
}

#[derive(Accounts)]
pub struct Initialize<'info>{
    #[account(init, payer=signer, space=8 + 4)]
    pub account: Account<'info, DataShape>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Add<'info>{
    #[account(mut)]
    pub account: Account<'info, DataShape>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Double<'info>{
    #[account(mut)]
    pub account: Account<'info, DataShape>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Half<'info>{
    #[account(mut)]
    pub account: Account<'info, DataShape>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Sub<'info>{
    #[account(mut)]
    pub account: Account<'info, DataShape>,
    pub signer: Signer<'info>
}