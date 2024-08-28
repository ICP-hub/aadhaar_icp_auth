use candid::{CandidType, Principal};
use ic_cdk::query;

#[query]
fn greet() -> Principal {
    ic_cdk::caller()
}
